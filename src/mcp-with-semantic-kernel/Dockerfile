# Use the official .NET SDK image as the base image
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Set the working directory in the container
WORKDIR /app

# Copy project files
# Copy the .csproj and restore dependencies
COPY ["mcp-with-semantic-kernel/*.csproj", "./"]
RUN dotnet restore

# Copy the rest of the application code
COPY . .

# Build the application
RUN dotnet build --no-restore -c Release

# Publish the application to the out directory
RUN dotnet publish -c Release -o out

# Use the official .NET runtime image for the final stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime

# Set the working directory to /app
WORKDIR /app

# Copy the built files from the build stage
COPY --from=build /app/out .

# Set environment variables for OpenAI API Key
# Make sure to replace 'your-api-key' with an actual key or pass it via Docker run
ENV OpenAI__ApiKey=your-api-key
ENV OpenAI__ChatModelId=gpt-4o

# Expose the port that the app listens on
EXPOSE 80

# Define the entry point for the application
ENTRYPOINT ["dotnet", "your_project_dll.dll"]