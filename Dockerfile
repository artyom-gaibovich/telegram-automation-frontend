FROM node:20 AS build

WORKDIR /opt

ADD . /opt

RUN npm install && npm run build

FROM nginx:latest

COPY --from=build /opt/dist /usr/share/nginx/html

COPY --from=build /opt/docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

STOPSIGNAL SIGQUIT

CMD ["nginx", "-g", "daemon off;"]
