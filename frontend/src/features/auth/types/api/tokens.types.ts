interface TokenRefreshEndpointSuccessResponse {
	success: true,
	access: string,
}

interface TokenRefreshEndpointErrorResponse {
	success: false,
	error: string
}

export type { TokenRefreshEndpointErrorResponse, TokenRefreshEndpointSuccessResponse }