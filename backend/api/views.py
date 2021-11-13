from rest_framework import generics
from api.models import CustomUser, WorkerUser, CustomerUser, RatingOfWorker
from api.serializers import CustomerSerializer, WorkerSerializer, RatingOfWorkerSerializer
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK,
    HTTP_226_IM_USED,
    HTTP_201_CREATED,
)
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import BasePermission
from rest_framework.permissions import IsAuthenticated

# Custom permission for users with "is_active" = True.
class IsWorker(BasePermission):
    """
    Allows access only to "is_worker" users.
    """

    def has_permission(self, request, view):
        return request.user and request.user.is_worker


class IsCustomer(BasePermission):
    """
    Allows access only to "is_customer" users.
    """

    def has_permission(self, request, view):
        return request.user and request.user.is_customer


# \\\\\\\\\\ Worker Login //////////
@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")
    if username is None or password is None:
        return Response({"error": "Please provide both username and password"}, status=HTTP_400_BAD_REQUEST)
    try:
        phone = eval(username)
    except:
        phone = ""
    if phone != "":
        username = phone
    else:
        try:
            customUser = CustomUser.objects.get(email=username)
            username = customUser.phone
        except:
            pass
    user = authenticate(username=username, password=password)
    if user:
        if user.is_worker:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({"token": token.key, "phone": user.phone, "user_type": "worker"}, status=HTTP_200_OK)
        elif user.is_customer:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({"token": token.key, "phone": user.phone, "user_type": "customer"}, status=HTTP_200_OK)
        else:
            return Response({"error": "Invalid Credentials"}, status=HTTP_400_BAD_REQUEST)
    else:
        return Response({"error": "Invalid Credentials"}, status=HTTP_400_BAD_REQUEST)


# \\\\\\\\\\ Change Password ///////////////


@csrf_exempt
@api_view(["POST"])
@permission_classes((IsAuthenticated,))
def update_password(request):
    oldpassword = request.data.get("oldpassword")
    newpassword = request.data.get("newpassword")
    if newpassword is None or oldpassword is None:
        return Response({"error": "Please provide both oldpassword, and newpassword"}, status=HTTP_400_BAD_REQUEST)
    else:
        user = request.user
        if user.check_password(oldpassword):
            print(user)
            user.set_password(newpassword)
            user.save()
            return Response({"succes": "Your password is changed.."}, status=HTTP_200_OK)
        else:
            return Response({"error": "Invalid Credentials"}, status=HTTP_404_NOT_FOUND)


class WorkerCreateViewSet(generics.CreateAPIView):
    queryset = CustomUser.objects.filter(is_worker=True)
    serializer_class = WorkerSerializer

    def create(self, request, *args, **kwargs):
        try:
            response = super().create(request, *args, **kwargs)
            user = CustomUser.objects.get(phone=response.data["phone"])
            return Response(
                {"token": user.auth_token.key, "phone": user.phone, "name": user.Worker_Profile.name},
                status=HTTP_201_CREATED,
            )
        except ValidationError as x:
            try:
                if CustomUser.objects.filter(phone=request.data["phone"]):
                    return Response({"error": {"Phone": "Phone Already in Used "}}, status=HTTP_400_BAD_REQUEST)

                if request.data["Worker_Profile"]["prof"] is None:
                    return Response({"Prof": "prof is required"}, status=HTTP_400_BAD_REQUEST)
                else:
                    return super().create(request, *args, **kwargs)
            except:
                return super().create(request, *args, **kwargs)


class WorkersViewSet(generics.ListAPIView):
    queryset = CustomUser.objects.filter(is_worker=True)
    serializer_class = WorkerSerializer
    # permission_classes = (IsAuthenticated,IsCustomer,)


class WorkerDetailView(generics.RetrieveUpdateAPIView):
    queryset = CustomUser.objects.filter(is_worker=True)
    serializer_class = WorkerSerializer
    permission_classes = (IsAuthenticated, IsWorker)
    lookup_field = "phone"

    def put(self, request, *args, **kwargs):
        try:
            token1 = request.headers["Authorization"].split()[1]
            phone = kwargs["phone"]
        except:
            return Response({"error": "Authentication Require"}, status=HTTP_404_NOT_FOUND)
        if phone and token1:
            try:
                user = CustomUser.objects.get(phone=phone)
                token2 = Token.objects.get(user=user).key
            except:
                return Response({"error": "Invalid Credentials"}, status=HTTP_404_NOT_FOUND)
            if token2 == token1:
                response = super().patch(request, *args, **kwargs)
                return response
            else:
                print("Bhklll")
                return Response({"error": "Invalid Credentials"}, status=HTTP_404_NOT_FOUND)
        else:
            return Response({"error": "Invalid Credentials"}, status=HTTP_404_NOT_FOUND)

    def get(self, request, *args, **kwargs):
        try:
            token1 = request.headers["Authorization"].split()[1]
            phone = kwargs["phone"]
        except:
            return Response({"error": "Authentication Require"}, status=HTTP_404_NOT_FOUND)
        if phone and token1:
            print(phone)
            try:
                user = CustomUser.objects.get(phone=phone)
                token2 = Token.objects.get(user=user).key
                if token2 == token1:
                    return super().get(request, *args, **kwargs)
                else:
                    return Response({"error": "Invalid Credentials"}, status=HTTP_404_NOT_FOUND)
            except:
                return Response({"error": "Invalid Credentials"}, status=HTTP_404_NOT_FOUND)
        else:
            return Response({"error": "Invalid Credentials"}, status=HTTP_404_NOT_FOUND)


class CustomerCreateViewSet(generics.CreateAPIView):
    queryset = CustomUser.objects.filter(is_customer=True)
    serializer_class = CustomerSerializer

    def create(self, request, *args, **kwargs):
        try:
            response = super().create(request, *args, **kwargs)
            user = CustomUser.objects.get(phone=response.data["phone"])
            return Response(
                {"token": user.auth_token.key, "phone": user.phone, "name": user.Customer_Profile.name},
                status=HTTP_201_CREATED,
            )
        except ValidationError as x:
            try:
                if CustomUser.objects.filter(phone=request.data["phone"]):
                    return Response({"error": {"Phone": "Phone Already in Used "}}, status=HTTP_400_BAD_REQUEST)
                else:
                    return super().create(request, *args, **kwargs)
            except:
                return super().create(request, *args, **kwargs)


class CustomerDetailView(generics.RetrieveUpdateAPIView):
    queryset = CustomUser.objects.filter(is_customer=True)
    serializer_class = CustomerSerializer
    permission_classes = (
        IsAuthenticated,
        IsCustomer,
    )
    lookup_field = "phone"

    def patch(self, request, *args, **kwargs):
        return Response({"error": "This action is not valid"}, status=HTTP_404_NOT_FOUND)

    def put(self, request, *args, **kwargs):
        try:
            token1 = request.headers["Authorization"].split()[1]
            phone = kwargs["phone"]
        except:
            return Response({"error": "Authentication Require"}, status=HTTP_404_NOT_FOUND)
        if phone and token1:
            try:
                user = CustomUser.objects.get(phone=phone)
                token2 = Token.objects.get(user=user).key
                if token2 == token1:
                    return super().partial_update(request, *args, **kwargs)
                else:
                    return Response({"error": "Invalid Credentials"}, status=HTTP_404_NOT_FOUND)
            except:
                return Response({"error": "Invalid Credentials"}, status=HTTP_404_NOT_FOUND)
        else:
            return Response({"error": "Invalid Credentials"}, status=HTTP_404_NOT_FOUND)

    def get(self, request, *args, **kwargs):
        try:
            token1 = request.headers["Authorization"].split()[1]
            phone = kwargs["phone"]
        except:
            return Response({"error": "Authentication Require"}, status=HTTP_404_NOT_FOUND)
        if phone and token1:
            print(phone)
            try:
                user = CustomUser.objects.get(phone=phone)
                token2 = Token.objects.get(user=user).key
                if token2 == token1:
                    return super().get(request, *args, **kwargs)
                else:
                    return Response({"error": "Invalid Credentials"}, status=HTTP_404_NOT_FOUND)
            except:
                return Response({"error": "Invalid Credentials"}, status=HTTP_404_NOT_FOUND)
        else:
            return Response({"error": "Invalid Credentials"}, status=HTTP_404_NOT_FOUND)


class GiveRatingViewSet(generics.CreateAPIView):
    queryset = RatingOfWorker.objects.all()
    serializer_class = RatingOfWorkerSerializer
