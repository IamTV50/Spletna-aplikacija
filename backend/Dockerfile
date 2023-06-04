# BACKEND DOCKER

FROM node:18.12.1

WORKDIR /.

COPY /package*.json ./

COPY / .

# Stage 2: Final image with Node.js backend and Python modules
FROM python:3.9

WORKDIR /.

# Copy the built Node.js backend from the previous stage
COPY --from=build-stage /. .

# Copy the Python requirements file to the container
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 3000

RUN npm install

CMD ["npm", "start"]
