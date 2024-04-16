const nextConfig = {
    // eslint-disable-next-line require-await
    async rewrites() {
        return [
            {
                destination: '/',
                source: '/:path*'
            },
        ];
    },

    images: {
        remotePatterns: [
		  {
                protocol: 'https',
                hostname: 'assets.coincap.io',
                port: '',
                pathname: '/assets/icons/**',
		  },
        ],
	  }
};

export default nextConfig;
