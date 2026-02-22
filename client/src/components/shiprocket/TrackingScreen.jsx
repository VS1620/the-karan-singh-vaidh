import React, { useState } from 'react';
import { trackShipment } from '../../api/shiprocketService';

/**
 * Shiprocket Tracking Component Example
 */
const TrackingScreen = () => {
    const [awb, setAwb] = useState('');
    const [trackingData, setTrackingData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleTrack = async (e) => {
        e.preventDefault();
        if (!awb) return;

        setLoading(true);
        setError(null);
        try {
            const data = await trackShipment(awb);
            setTrackingData(data);
        } catch (err) {
            setError(err.message || 'Failed to fetch tracking details');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h2 className="text-2xl font-bold">Track Your Order</h2>

            <form onSubmit={handleTrack} className="flex gap-2">
                <input
                    type="text"
                    value={awb}
                    onChange={(e) => setAwb(e.target.value)}
                    placeholder="Enter AWB Number"
                    className="flex-1 border p-2 rounded"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
                >
                    {loading ? 'Tracking...' : 'Track'}
                </button>
            </form>

            {error && <p className="text-red-500">{error}</p>}

            {trackingData && (
                <div className="mt-4 border-t pt-4">
                    <h3 className="font-semibold text-lg">Shipment Status: {trackingData.tracking_data?.shipment_track?.[0]?.current_status}</h3>
                    <div className="mt-2 space-y-1 text-sm text-gray-600">
                        <p><strong>AWB:</strong> {trackingData.tracking_data?.shipment_track?.[0]?.awb_code}</p>
                        <p><strong>Courier:</strong> {trackingData.tracking_data?.shipment_track?.[0]?.courier_name}</p>
                        <p><strong>Expected Delivery:</strong> {trackingData.tracking_data?.shipment_track?.[0]?.expected_date}</p>
                    </div>

                    <div className="mt-4">
                        <h4 className="font-semibold">Tracking History:</h4>
                        <ul className="mt-2 space-y-2">
                            {trackingData.tracking_data?.shipment_track_activities?.map((activity, index) => (
                                <li key={index} className="border-l-2 border-blue-500 pl-4 py-1">
                                    <p className="font-medium">{activity.status}</p>
                                    <p className="text-xs text-gray-500">{activity.date} - {activity.location}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TrackingScreen;
