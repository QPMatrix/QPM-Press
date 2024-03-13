/** @type {import('next').NextConfig} */
const nextConfig = {
    crossOrigin: 'anonymous',
    reactStrictMode:false,
    images:{
        domains:[
            'uploadthing.com',
            'utfs.io',
            'img.clerk.com',
            'subdomain',
            'files.stripe.com'
        ]
    }
};

export default nextConfig;
