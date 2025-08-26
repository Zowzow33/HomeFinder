import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { type StatsResponse } from '../types';
import apiService from '../services/api';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [prospectStats, setProspectStats] = useState<StatsResponse | null>(null);
  const [propertyStats, setPropertyStats] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [prospects, properties] = await Promise.all([
          apiService.getProspectStats(),
          apiService.getPropertyStats(),
        ]);
        setProspectStats(prospects);
        setPropertyStats(properties);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="dashboard">
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  const prospectStatusCounts = prospectStats?.stats.reduce((acc, stat) => {
    acc[stat._id as string] = stat.count;
    return acc;
  }, {} as Record<string, number>) || {};

  const propertyStatusCounts = propertyStats?.stats.reduce((acc, stat) => {
    if (typeof stat._id === 'object' && stat._id.status) {
      acc[stat._id.status] = (acc[stat._id.status] || 0) + stat.count;
    }
    return acc;
  }, {} as Record<string, number>) || {};

  const totalValue = propertyStats?.stats.reduce((sum, stat) => sum + (stat.totalValue || 0), 0) || 0;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.firstName}!</h1>
        <p>Here's an overview of your activity</p>
      </div>

      <div className="stats-grid">
        {/* Prospect Stats */}
        <div className="stat-card">
          <h2>📊 Prospects Overview</h2>
          <div className="stat-main">
            <span className="stat-number">{prospectStats?.total || 0}</span>
            <span className="stat-label">Total Prospects</span>
          </div>
          <div className="stat-breakdown">
            <div className="stat-item">
              <span className="stat-value">{prospectStatusCounts['new'] || 0}</span>
              <span className="stat-desc">New</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{prospectStatusCounts['contacted'] || 0}</span>
              <span className="stat-desc">Contacted</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{prospectStatusCounts['closed'] || 0}</span>
              <span className="stat-desc">Closed</span>
            </div>
          </div>
        </div>

        {/* Property Stats */}
        <div className="stat-card">
          <h2>🏠 Properties Overview</h2>
          <div className="stat-main">
            <span className="stat-number">{propertyStats?.total || 0}</span>
            <span className="stat-label">Total Properties</span>
          </div>
          <div className="stat-breakdown">
            <div className="stat-item">
              <span className="stat-value">{propertyStatusCounts['available'] || 0}</span>
              <span className="stat-desc">Available</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{propertyStatusCounts['under_offer'] || 0}</span>
              <span className="stat-desc">Under Offer</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{propertyStatusCounts['sold'] || 0}</span>
              <span className="stat-desc">Sold</span>
            </div>
          </div>
        </div>

        {/* Portfolio Value */}
        <div className="stat-card">
          <h2>💰 Portfolio Value</h2>
          <div className="stat-main">
            <span className="stat-number">€{totalValue.toLocaleString()}</span>
            <span className="stat-label">Total Portfolio Value</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="stat-card">
          <h2>⚡ Quick Actions</h2>
          <div className="quick-actions">
            <Link to="/prospects/new" className="action-button">
              Add New Prospect
            </Link>
            <Link to="/properties/new" className="action-button">
              Add New Property
            </Link>
            <Link to="/prospects" className="action-button">
              View All Prospects
            </Link>
            <Link to="/properties" className="action-button">
              View All Properties
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;