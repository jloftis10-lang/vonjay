// Shared by the inquiry form and /api/inquire so the server only accepts topics the form offers.
export const inquiryTypes = ['Booking a show', 'Press or interview', 'Something else'] as const;

export const isInquiryType = (v: string): boolean => (inquiryTypes as readonly string[]).includes(v);
