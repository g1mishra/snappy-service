from django.urls import path, re_path
from api.views import login, update_password  # ,ErrorView
from api.views import (
    WorkerCreateViewSet,
    WorkerDetailView,
    WorkersViewSet,
    CustomerCreateViewSet,
    CustomerDetailView,
    GiveRatingViewSet,
)

urlpatterns = [
    path("register/worker/", WorkerCreateViewSet.as_view()),
    path("worker/", WorkersViewSet.as_view()),
    path("worker/<int:phone>/", WorkerDetailView.as_view()),
    # /////////////----__________-----\\\\\\\\\\\\\#
    # path("customer/",CustomersViewSet.as_view()),
    path("register/customer/", CustomerCreateViewSet.as_view()),
    path("customer/<int:phone>/", CustomerDetailView.as_view()),
    # ////////////         ||||||||||||   \\\\\\\\\\\\\\\\\\
    path("user/login/", login, name="user_login"),
    path("change_password/", update_password, name="update_password"),
    path("worker/<int:phone>/give-rating/", GiveRatingViewSet.as_view()),
]
