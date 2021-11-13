from django.contrib import admin
from django.urls import path, re_path, include
from django.conf.urls import url
from django.conf.urls.static import static
from django.conf import settings
from .views import index


urlpatterns = [
    path("api/", include("api.urls")),
    path("admin/", admin.site.urls),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [re_path(r"^(?:.*)/?$", index, name="index")]
