from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from rest_framework.authtoken.models import Token
from api.models import CustomUser,WorkerUser,CustomerUser,Profile,RatingOfWorker


class WorkerUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkerUser
        fields = ("id",'name', 'photo', 'dob', 'address','state', 'city',"prof", "is_available","get_rating",
                  "hourly_rate","daily_rate")
        extra_kwargs = {
            'prof': {'required': True,'error_messages': {'blank': "Please provide your Prof"}},
            "get_rating": {'read_only': True},
        }

class WorkerSerializer(serializers.ModelSerializer):
    Worker_Profile = WorkerUserSerializer(required=True)
    class Meta:
        model = CustomUser
        fields = ('id', 'email',"phone",'password',"Worker_Profile",)
        extra_kwargs = {'password': {'write_only': True} ,'email': {'required': False},
                        "phone" : { "error_messages":{"blank" : "Please provide Mobile Number"} }
        }
        lookup_field = 'phone'
    def validate_phone(self, value):
        if value is not None:
            exist_phone = CustomUser.objects.filter(phone=value)
            if exist_phone:
                raise serializers.ValidationError("Error, This Phone is already taken")
        return value
    def create(self, validated_data):
        profile_data = validated_data.pop("Worker_Profile")
        phone = validated_data.pop("phone")
        self.validate_phone(phone)
        password = validated_data.pop('password')
        try:
            user = CustomUser(phone=phone,**validated_data)
            user.set_password(password)
            user.is_worker=True
            user.save()
            print(user.phone)
            WorkerUser.objects.create(user=user, **profile_data)
            Token.objects.create(user=user)
            return user
        except Exception as e:
            error = {'message': ",".join(e.args) if len(e.args) > 0 else 'Unknown Error'}
            raise serializers.ValidationError(error)

    def update(self, instance, validated_data):
        # print("valid data",validated_data)
        try:
            profile_data = validated_data.pop("Worker_Profile")
        except:
            profile_data = None
        profile = instance.Worker_Profile
        instance.email = validated_data.get('email', instance.email)    
        instance.phone = validated_data.get('phone', instance.phone)    
        instance.save()
        if profile_data is not None:
            profile.name = profile_data.get('name', profile.name)
            profile.photo = profile_data.get('photo', profile.photo)
            profile.dob = profile_data.get('dob', profile.dob)
            profile.address = profile_data.get('address', profile.address)
            profile.state = profile_data.get('state', profile.state)
            profile.city = profile_data.get('city', profile.city)
            profile.hourly_rate = profile_data.get('hourly_rate', profile.hourly_rate)
            profile.daily_rate = profile_data.get('daily_rate', profile.daily_rate)
            profile.prof = profile_data.get('prof', profile.prof)
            profile.is_available = profile_data.get('is_available', profile.is_available)
            profile.save()
        return instance

class CustomerUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerUser
        fields = ("id","name",'photo', 'dob', 'address','state', 'city', )
class CustomerSerializer(serializers.ModelSerializer):
    Customer_Profile = CustomerUserSerializer(required=True)
    
    class Meta:
        model = CustomUser
        fields = ('id', 'email',"phone",'password',"Customer_Profile")
        extra_kwargs = {'password': {'write_only': True} ,'email': {'required': False},
                        "phone" : { "error_messages":{"blank" : "Please provide Mobile Number"} }}
        lookup_field = 'phone'
        
    
    def create(self, validated_data):
        profile_data = validated_data.pop("Customer_Profile")
        password = validated_data.pop('password')
        user = CustomUser(**validated_data)
        user.set_password(password)
        user.is_customer=True
        user.save()
        CustomerUser.objects.create(user=user, **profile_data)
        Token.objects.create(user=user)
        return user

    def update(self, instance, validated_data):
        profile_data = validated_data.pop("Customer_Profile")
        profile = instance.Customer_Profile
        instance.email = validated_data.get('email', instance.email)
        instance.save()
        profile.name = profile_data.get('name', profile.name)
        profile.photo = profile_data.get('photo', profile.photo)
        profile.dob = profile_data.get('dob', profile.dob)
        profile.address = profile_data.get('address', profile.address)
        profile.state = profile_data.get('state', profile.state)
        profile.city = profile_data.get('city', profile.city)
        profile.save()

        return instance

class RatingOfWorkerSerializer(serializers.ModelSerializer):
    class Meta:
        model = RatingOfWorker
        fields = "__all__"
        
    def create(self, validated_data):
        stars = validated_data.pop('stars')
        worker = validated_data.pop('worker')
        customer = validated_data.pop('user')
        rating=RatingOfWorker.objects.create(user=customer, worker=worker,stars=stars,)
        return rating

