FROM adoptopenjdk/openjdk11-openj9:alpine-slim
ENV APP_FILE udgisi-0.0.1-SNAPSHOT.jar
ENV APP_HOME /usr/apps
EXPOSE 8080
EXPOSE 6001
COPY target/$APP_FILE $APP_HOME/
WORKDIR $APP_HOME
ENTRYPOINT ["sh", "-c"]
##CMD ["exec java -jar $APP_FILE"]
CMD ["exec java -Dcom.sun.management.jmxremote=true -Dcom.sun.management.jmxremote.port=6001 -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.ssl=false -Djava.rmi.server.hostname=127.0.0.1 -Dcom.sun.management.jmxremote.rmi.port=6001  -jar $APP_FILE"]