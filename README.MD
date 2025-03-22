# VeryCart

VeryCart is an e-commerce platform designed to provide a seamless shopping experience for users. It includes features such as product browsing, order creation, payment processing, and notifications.

## Features

- **User Authentication**: Secure user registration, login, and role-based access control.
- **Product Management**: Add, update, delete, and browse products with categories and filters.
- **Order Management**: Create, and manage orders with real-time updates.
- **Payment Integration**: Seamless integration with Paystack for secure payment processing.
- **Notifications**: Real-time notifications for order updates, payment confirmations, and more.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Message Broker**: RabbitMQ
- **Payment Gateway**: Paystack
- **Others**: TypeScript, Mongoose

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- RabbitMQ

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/onoja123/verycart.git
    ```

2. Navigate to the project directory:
    ```bash
    cd verycart
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Set up environment variables:
    - Please create a new `.env` file in the root directory.
    - Copy the contents of `.env.example` and fill it with the correct details.

5. Start RabbitMQ (if not already running):
    ```bash
    docker run -d --hostname my-rabbit --name verycart-rabbit -p 5672:5672 -p 15672:15672 rabbitmq:3-management
    ```

### Running the Application

1. Start the application:
    ```bash
    npm run dev
    ```

2. Access the API at `http://localhost:3000`.

## API Documentation

For detailed API documentation, refer to the [Swagger UI](http://localhost:3000/api-docs) or import the Postman collection from `docs/postman_collection.json`.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes with descriptive commit messages.
4. Submit a pull request.

Please ensure your code follows the project's coding standards and includes appropriate tests.
