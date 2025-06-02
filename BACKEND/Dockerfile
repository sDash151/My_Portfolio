# Start with a base image containing Java runtime
FROM maven:3.8.4-openjdk-17 AS build

# Set the working directory inside the container
WORKDIR /app

#Copy the pom.xml and install dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

#Copy the source code and build the application
COPY src ./src
RUN mvn clean package -DskipTests

#Use an official OpenJDK image to run the application
FROM openjdk:17-jdk-slim

#Set the working directory
WORKDIR /app

#Copy the built JAR file from the build stage
COPY --from=build /app/target/contactform-0.0.1-SNAPSHOT.jar /app/contactform-0.0.1-SNAPSHOT.jar

# Expose the port your app runs on (change if needed)
EXPOSE 8080

#Specify the command to run the application
ENTRYPOINT ["java", "-jar", "/app/contactform-0.0.1-SNAPSHOT.jar"]


