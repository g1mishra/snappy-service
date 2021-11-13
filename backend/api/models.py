from django.contrib.auth.models import BaseUserManager
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.utils.translation import ugettext_lazy as _
from django.conf import settings
import datetime


class MyUserManager(BaseUserManager):
    """
    A custom user manager to deal with emails as unique identifiers for auth
    instead of usernames. The default that's used is "UserManager"
    """

    def _create_user(self, phone, password, **extra_fields):
        if not phone:
            raise ValueError("The Phone must be set")
        user = self.model(phone=phone, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, phone, password=None, **extra_fields):

        if password is None:
            raise TypeError("Superusers must have a password.")

        user = self._create_user(phone=phone, password=password, **extra_fields)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        Token.objects.create(user=user)
        return user


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_("email address"), blank=True, null=True)
    phone = models.CharField(max_length=13, blank=False, unique=True)
    is_worker = models.BooleanField(_("Worker user"), default=False)
    is_customer = models.BooleanField(_("customer user"), default=False)
    is_staff = models.BooleanField(
        _("staff status"),
        default=False,
        help_text=_("Designates whether the user can log into this admin site."),
    )

    REQUIRED_FIELDS = []
    USERNAME_FIELD = "phone"
    objects = MyUserManager()

    def __str__(self):
        return self.phone

    def get_full_name(self):
        return self.phone

    def get_short_name(self):
        return self.phone

    class Meta:
        db_table = "Users"


class Profile(models.Model):
    name = models.CharField(blank=True, null=True, max_length=255)
    dob = models.DateField(_("Date Of Birth"), default=datetime.date.today)
    photo = models.ImageField(blank=True, null=True, upload_to="profile_pic")
    address = models.CharField(blank=True, null=True, max_length=255)
    state = models.CharField(blank=True, null=True, max_length=50, default="Punjab")
    city = models.CharField(blank=True, null=True, max_length=50)

    def __str__(self):
        return str(self.customer.phone)

    class Meta:
        abstract = True

    def __unicode__(self):
        return u"photo {0}".format(self.photo.url)


class WorkerUser(Profile):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="Worker_Profile")
    prof = models.CharField(blank=False, max_length=50, default="Electrician")

    is_available = models.BooleanField(
        verbose_name="Available",
        default=False,
        help_text=_("Designates whether this worker is available. " "Activate by missed call"),
    )
    hourly_rate = models.IntegerField(default=100, blank=True, null=True)
    daily_rate = models.IntegerField(default=400, blank=True, null=True)

    class Meta:
        db_table = "Worker"

    def get_rating(self):
        sum = 0
        ratings = RatingOfWorker.objects.filter(worker=self)
        for rating in ratings:
            sum += rating.stars
        if len(ratings) > 0:
            average = sum / len(ratings)
        else:
            average = 0
        rating = {"average_rating": average, "no_of_rating": len(ratings)}
        return rating

    def __str__(self):
        return "{}".format(self.user.phone)


class CustomerUser(Profile):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="Customer_Profile")

    class Meta:
        db_table = "Customer"

    def __str__(self):
        return "{}".format(self.user.phone)


class RatingOfWorker(models.Model):
    worker = models.ForeignKey(WorkerUser, on_delete=models.CASCADE, related_name="rating")
    user = models.ForeignKey(CustomerUser, on_delete=models.CASCADE)
    stars = models.IntegerField(null=True, validators=[MaxValueValidator(5), MinValueValidator(1)])
