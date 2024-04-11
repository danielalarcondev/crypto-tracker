const nextConfig = {
    // eslint-disable-next-line require-await
    async rewrites() {
        return [
            {
                destination: '/',
                source: '/:path*'
            },
        ];
    }
};

export default nextConfig;
