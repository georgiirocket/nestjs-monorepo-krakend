FROM nginx:alpine

# Copy your template Nginx configuration to the container
COPY nginx/nginx.template.conf /etc/nginx/templates/default.template

# Script to substitute environment variables and start Nginx
CMD envsubst '${NGINX_USER_BACKEND} ${NGINX_AUTH_BACKEND} ${NGINX_POST_BACKEND}' < /etc/nginx/templates/default.template > /etc/nginx/conf.d/default.conf && \
    nginx -g 'daemon off;'
