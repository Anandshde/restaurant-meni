# Restaurant Menu Application

This project contains a Next.js frontend (`client`) and an Express/MongoDB backend (`server`). It is configured to use Cloudinary for image uploads, MongoDB for data storage, and can be deployed with Vercel (frontend) and Render (backend).

## Setup

### Prerequisites
- Node.js 18 or later
- npm
- Cloudinary account
- MongoDB Atlas database
- Accounts on [Vercel](https://vercel.com/) and [Render](https://render.com/) for deployment (optional)

### Backend
1. Copy `server/.env` and update the values:
   ```bash
   MONGO_URI=your_mongodb_connection
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=securepassword123
   JWT_SECRET=supersecretjwtkey123

   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
2. Install dependencies:
   ```bash
   cd server
   npm ci
   ```
3. Start the server locally:
   ```bash
   node index.js
   ```
   The API will run on port `8000` by default.
4. When deploying to Render, set the same environment variables in the Render dashboard.

### Frontend
1. Copy `client/.env` and make sure `NEXT_PUBLIC_API_URL` points to your backend URL (local or Render):
   ```bash
   NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
   ```
2. Install dependencies:
   ```bash
   cd client
   npm ci
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Deploy the `client` folder to Vercel and configure the `NEXT_PUBLIC_API_URL` environment variable there as well.

## Notes
- Image uploads are streamed directly to Cloudinary using memory storage and `streamifier`.
- The repository includes some `node_modules` for convenience but running `npm ci` is recommended.
