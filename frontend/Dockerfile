FROM node:20.14.0

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy project
COPY . .

# Expose port 3000
EXPOSE 3000

# Command to run the frontend server
CMD ["npm", "run", "dev"]