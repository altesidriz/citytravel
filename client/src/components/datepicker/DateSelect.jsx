import React from 'react';
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;

const DateSelect = ({ onDateChange }) => { // Receive the callback as a prop
  const handleRangeChange = (dates) => {
    if (onDateChange) {
      onDateChange(dates); // Call the callback with the new dates
    }
  };

  return (
    <Space direction="vertical" size={12}>
      <RangePicker onChange={handleRangeChange} />
    </Space>
  );
};

export default DateSelect;