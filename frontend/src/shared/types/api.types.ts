interface ApiErrorResponse {
    success: false,
    error: string
}

interface ApiSuccessResponse {
    success: true,
    message: string
}

export type { ApiErrorResponse, ApiSuccessResponse }