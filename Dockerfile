FROM mcr.microsoft.com/playwright:v1.56.1-jammy

# Copy application files
COPY . /pw-tests

# Set working directory
WORKDIR /pw-tests

# Install dependencies
RUN npm ci

# Run tests
CMD ["npm", "run", "test"]