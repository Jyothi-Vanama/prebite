import React from 'react';

const DashboardCard = ({ title, amount, subtitle }) => {
  return (
    <div className="card wallet-summary">
      <h3>{title}</h3>
      <div className="balance-amount" style={{fontSize: '2.2rem', fontWeight: '700', color: '#FF7A30', margin: '1rem 0'}}>{amount}</div>
      {subtitle && <div className="balance-subtitle">{subtitle}</div>}
    </div>
  );
};

export default DashboardCard;