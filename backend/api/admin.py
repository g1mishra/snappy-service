from django.contrib import admin

# from django.contrib.auth.admin import UserAdmin
from api.models import CustomerUser, WorkerUser, CustomUser
from django.contrib.auth.models import Group
from django.utils.safestring import mark_safe

admin.site.site_header = "backend Admin Dashboard"


admin.site.unregister(Group)


class UserAdmin(admin.ModelAdmin):
    list_filter = ("is_worker", "is_customer")
    list_display = ("phone", "is_worker", "is_customer", "is_staff")
    fieldsets = (
        (
            (
                None,
                {
                    "fields": ("phone", "password", "email", "is_worker", "is_customer", "is_staff", "last_login"),
                },
            )
        ),
    )

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False


class WorkerAdmin(admin.ModelAdmin):
    model = WorkerUser
    list_display = (
        "user",
        "name",
        "prof",
        "is_available",
    )
    fieldsets = (
        (
            (
                None,
                {
                    "fields": (
                        "user",
                        "name",
                        "photo",
                        "dob",
                        "address",
                        "state",
                        "city",
                        "prof",
                        "is_available",
                        "hourly_rate",
                        "daily_rate",
                    ),
                },
            )
        ),
    )


admin.site.register(WorkerUser, WorkerAdmin)

admin.site.register(CustomUser, UserAdmin)
admin.site.register(CustomerUser)
