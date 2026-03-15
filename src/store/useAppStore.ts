import { create } from 'zustand';
import { mockBookings, mockTurfs, mockUser } from '../data/mockData';
import { Booking, TimeSlot, Turf, User } from '../types';

interface BookingDraft {
    turfId: string;
    turfName: string;
    turfImage: string;
    selectedDate: string;
    selectedSlot: TimeSlot | null;
    duration: number;
    sport: string;
    promoCode: string;
    discount: number;
}

interface AppState {
    // User
    user: User;
    isLoggedIn: boolean;
    setLoggedIn: (val: boolean) => void;

    // Turfs
    turfs: Turf[];
    favorites: string[];
    toggleFavorite: (turfId: string) => void;

    // Booking flow
    bookingDraft: BookingDraft;
    setBookingDraft: (draft: Partial<BookingDraft>) => void;
    clearBookingDraft: () => void;

    // Confirmed bookings
    bookings: Booking[];
    addBooking: (booking: Booking) => void;
    cancelBooking: (bookingId: string) => void;

    // Filters
    selectedSport: string;
    setSelectedSport: (sport: string) => void;

    // Location
    currentLocation: string;
    setCurrentLocation: (loc: string) => void;
}

const defaultDraft: BookingDraft = {
    turfId: '',
    turfName: '',
    turfImage: '',
    selectedDate: '',
    selectedSlot: null,
    duration: 1,
    sport: 'Football',
    promoCode: '',
    discount: 0,
};

export const useAppStore = create<AppState>((set) => ({
    user: mockUser,
    isLoggedIn: false,
    setLoggedIn: (val) => set({ isLoggedIn: val }),

    turfs: mockTurfs,
    favorites: ['t1', 't3'],
    toggleFavorite: (turfId) =>
        set((state) => ({
            favorites: state.favorites.includes(turfId)
                ? state.favorites.filter((id) => id !== turfId)
                : [...state.favorites, turfId],
        })),

    bookingDraft: defaultDraft,
    setBookingDraft: (draft) =>
        set((state) => ({
            bookingDraft: { ...state.bookingDraft, ...draft },
        })),
    clearBookingDraft: () => set({ bookingDraft: defaultDraft }),

    bookings: mockBookings,
    addBooking: (booking) =>
        set((state) => ({ bookings: [booking, ...state.bookings] })),
    cancelBooking: (bookingId) =>
        set((state) => ({
            bookings: state.bookings.map((b) =>
                b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
            ),
        })),

    selectedSport: 'Football',
    setSelectedSport: (sport) => set({ selectedSport: sport }),

    currentLocation: 'Downtown, New York',
    setCurrentLocation: (loc) => set({ currentLocation: loc }),
}));
