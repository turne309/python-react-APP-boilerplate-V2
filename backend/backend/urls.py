from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView
# These are prebuilt views that allow us to access the jwt and refresh the jwt
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("api-auth/", include("rest_framework.urls")),
    # Whenever a route is requested that doesn't apply to the above routes, we will go to the router in the api directory
    path("api/", include("api.urls")),

]



#  ===========================================================================================================
#  ===========================================================================================================
# MAKE SURE TO RUN THE FOLLOWING TERMINAL COMMANDS WHEN ADJUSTING OR ADDING ANY PATHS

# The following command creates the file that specifies the migrations that need to be performed 
# python manage.py makemigrations

# The following command will run the migration from the above command
# python manage.py migrate