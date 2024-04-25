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
        minimumCacheTTL: 3600000,
        remotePatterns: [
		  {
                protocol: 'https',
                hostname: 'assets.coincap.io',
                port: '',
                pathname: '/assets/icons/**',
		  },
        ],
	  },

	  transpilePackages: ['react-responsive-pagination'],
};

export default nextConfig;
