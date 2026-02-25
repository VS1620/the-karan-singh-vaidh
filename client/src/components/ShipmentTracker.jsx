/**
 * ShipmentTracker.jsx
 * Displays Shiprocket shipment details and live tracking for a given order.
 * Receives `orderId` as a prop and fetches tracking from /api/shipment/track/:orderId
 */

import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { Package, Truck, ExternalLink, RefreshCw, CheckCircle2, Clock } from 'lucide-react';

const ShipmentTracker = ({ orderId, initialData = {} }) => {
    const [tracking, setTracking] = useState(initialData);
    const [loading, setLoading] = useState(!initialData?.awb_code);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);

    const fetchTracking = async (showRefreshState = false) => {
        if (showRefreshState) setRefreshing(true);
        else setLoading(true);
        setError(null);

        try {
            const { data } = await api.get(`/shipment/track/${orderId}`);
            setTracking(data);
        } catch (err) {
            setError(err.response?.data?.message || 'Unable to fetch tracking info');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        if (orderId && !initialData?.awb_code) {
            fetchTracking();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderId]);

    // ── Skeleton loader ───────────────────────────────────────────────────────
    if (loading) {
        return (
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
        );
    }

    // ── No AWB yet ────────────────────────────────────────────────────────────
    if (!tracking?.awb_code) {
        return (
            <div className="bg-white rounded-lg p-6 shadow-sm border border-amber-100">
                <div className="flex items-center gap-3 mb-2">
                    <Clock className="text-amber-500" size={20} />
                    <h3 className="font-semibold text-gray-800">Shipment Processing</h3>
                </div>
                <p className="text-sm text-gray-500">
                    {error || 'Your shipment is being arranged. Tracking details will appear here once the courier is assigned.'}
                </p>
                <button
                    onClick={() => fetchTracking(true)}
                    disabled={refreshing}
                    className="mt-3 flex items-center gap-2 text-xs text-emerald-700 font-medium hover:underline disabled:opacity-50"
                >
                    <RefreshCw size={12} className={refreshing ? 'animate-spin' : ''} />
                    {refreshing ? 'Refreshing...' : 'Refresh tracking'}
                </button>
            </div>
        );
    }

    // ── Full tracking card ────────────────────────────────────────────────────
    return (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-emerald-100">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="bg-emerald-100 p-1.5 rounded-full">
                        <Truck className="text-emerald-700" size={16} />
                    </div>
                    <h3 className="font-semibold text-gray-800 text-sm">Shipment Details</h3>
                </div>
                <button
                    onClick={() => fetchTracking(true)}
                    disabled={refreshing}
                    className="flex items-center gap-1 text-xs text-gray-500 hover:text-emerald-700 transition disabled:opacity-50"
                    title="Refresh tracking"
                >
                    <RefreshCw size={12} className={refreshing ? 'animate-spin' : ''} />
                    Refresh
                </button>
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">AWB Number</p>
                    <p className="font-mono font-semibold text-gray-800 text-xs">{tracking.awb_code}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Courier</p>
                    <p className="font-semibold text-gray-800 text-xs">{tracking.courier_name || 'N/A'}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 col-span-2">
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Status</p>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-emerald-600" />
                        <p className="font-semibold text-emerald-700 text-xs">{tracking.shipment_status || 'Pickup Scheduled'}</p>
                    </div>
                </div>
            </div>

            {/* Live tracking events */}
            {tracking.live_tracking?.tracking_data?.shipment_track_activities?.length > 0 && (
                <div className="mb-4">
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Tracking History</p>
                    <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                        {tracking.live_tracking.tracking_data.shipment_track_activities.slice(0, 5).map((activity, i) => (
                            <div key={i} className="flex gap-3 text-xs">
                                <div className="flex flex-col items-center">
                                    <div className={`w-2 h-2 rounded-full mt-0.5 flex-shrink-0 ${i === 0 ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
                                    {i < tracking.live_tracking.tracking_data.shipment_track_activities.length - 1 && (
                                        <div className="w-px flex-1 bg-gray-200 mt-1"></div>
                                    )}
                                </div>
                                <div className="pb-2">
                                    <p className="font-medium text-gray-700">{activity['sr-status-label'] || activity.activity}</p>
                                    <p className="text-gray-400">{activity.location} · {activity.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Track externally */}
            {tracking.tracking_url && (
                <a
                    href={tracking.tracking_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-emerald-800 text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-emerald-900 transition"
                >
                    <Package size={14} />
                    Track Your Shipment
                    <ExternalLink size={12} />
                </a>
            )}
        </div>
    );
};

export default ShipmentTracker;
