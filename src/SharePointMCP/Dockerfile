# Use the official .NET image as a base image
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base

# Set the working directory
WORKDIR /app

# Copy project files to the container
COPY . .

# Use the SDK image to build the application
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

# Set the working directory for the build process
WORKDIR /src

# Copy the project file and restore dependencies
COPY ["MCPServer/MCPServer.csproj", "MCPServer/"]
RUN dotnet restore "MCPServer/MCPServer.csproj"

# Copy the rest of the application code and build the application
COPY . .
WORKDIR "/src/MCPServer"
RUN dotnet build "MCPServer.csproj" -c Release -o /app/build

# Publish the app
FROM build AS publish
RUN dotnet publish "MCPServer.csproj" -c Release -o /app/publish

# Build runtime image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Set environment variables for .NET application
ENV ASPNETCORE_URLS=http://+:5000 
ENV DOTNET_ENVIRONMENT=Production

# Expose the port that your app listens on
EXPOSE 5000

# Run the application
ENTRYPOINT ["dotnet", "MCPServer.dll"]
```

### Comments:
- **Base Image**: Utilize official .NET images for runtime and SDK to ensure compatibility and performance.
- **Working Directory**: The `/app` directory is used for running the application and the `/src` directory is used for building the source code.
- **Dependencies**: The dependencies are restored separately to leverage Docker caching effectively.
- **Copy Files**: Project files and source code are copied for building and publishing.
- **Build and Publish**: The application is built and published to a specific directory in stages to optimize the Docker layers.
- **Environment Variables**: Configuration for production is set for ASP.NET Core.
- **Port Exposure**: The application is exposed on the standard HTTP port 5000.
- **Entry Point**: The application is started using the `dotnet` command.