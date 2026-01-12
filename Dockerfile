FROM sw.v-serv.ru:444/rosim_docker/base_images_instruction/node20:0.0.1 as build

ADD . /opt

WORKDIR /opt

RUN npm install && npm run build

FROM sw.v-serv.ru:444/rosim_docker/base_images_instruction/nginx:0.0.1

COPY --from=build /opt/dist /opt

COPY --from=build /opt/docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

STOPSIGNAL SIGQUIT

CMD ["nginx", "-g", "daemon off;"]

