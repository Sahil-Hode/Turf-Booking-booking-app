export interface Turf {
    id: string;
    name: string;
    location: string;
    city: string;
    rating: number;
    reviewCount: number;
    pricePerHour: number;
    images: string[];
    sports: string[];
    amenities: Amenity[];
    distance: string;
    isOpen: boolean;
    closingTime: string;
    description: string;
    featured?: boolean;
    coordinates: { lat: number; lng: number };
}

export interface Amenity {
    id: string;
    name: string;
    icon: string;
}

export interface TimeSlot {
    id: string;
    time: string;
    period: 'morning' | 'evening' | 'night';
    price: number;
    status: 'available' | 'booked' | 'selected';
}

export interface Booking {
    id: string;
    turfId: string;
    turfName: string;
    turfImage: string;
    date: string;
    timeSlot: string;
    duration: number;
    totalAmount: number;
    status: 'upcoming' | 'completed' | 'cancelled';
    sport: string;
    location: string;
    bookingRef: string;
}

export interface SportCategory {
    id: string;
    name: string;
    icon: string;
    count: number;
}

export interface Review {
    id: string;
    userName: string;
    userInitials: string;
    rating: number;
    comment: string;
    date: string;
}

export interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'booking' | 'offer' | 'reminder' | 'system';
    time: string;
    read: boolean;
}

export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
    totalBookings: number;
    favoriteCount: number;
}
