'use client'
// @ts-ignore
import Stripe from 'stripes';

export interface UserDetails{
    id: string;
    first_name: string;
    last_name: string;
    full_name: string;
    avatar: string;
    billing_address: Stripe.Address;
    payment_method: Stripe.PaymentMethod[Stripe.PaymentMethod.Type];
}
export interface Artist{
    id: string;
    author: string;
    picture: string;
    description: string;
    followers: string;
    facebook: string;
    instagram: string;
    linkedIn: string;

}

export interface Song{
    id: string;
    title: string;
    song_url: string;
    image_url: string;
    user_id: string;
    artist_id: string;
}

export interface Product{
    id: string;
    active: boolean;
    name?: string;
    description?: string;
    image?: string;
    metadata: Stripe.Metadata;
}

export interface Price{
    id: string;
    product_id: string;
    active?: boolean;
    description?: string;
    unit_amount: number;
    currency: string;
    type?: Stripe.Price.Type;
    interval_count: number;
    interval?:Stripe.Price.Pecurring.Interval;
    trial_period_days?: number | null;
    metadata?: Stripe.Metadata;
    products?: Product
}

export interface ProductWithPrice extends Product{
    prices: Price[];
}

export interface Subscription{
    id: string;
    user_id: string;
    status: Stripe.Subscription.Status;
    metadata: Stripe.Metadata;
    price_id: string;
    Quantity: number;
    cancel_at_period_end?: boolean
    created: string;
    current_period_start: string;
    current_period_end: string;
    ended_at: string;
    cancel_at: string;
    canceled_at: string;
    trial_start: string;
    trial_end: string;
    prices?: Price

}