import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
  {
    filterType: 'Location',
    array: ['Delhi NCR', 'Bangalore', 'Hyderabad', 'Pune', 'Mumbai'],
  },
  {
    filterType: 'Industry',
    array: ['Frontend Developer', 'Backend Developer', 'FullStack Developer'],
  },
  {
    filterType: 'Salary',
    array: ['0-40k', '42-1lakh', '1lakh to 5lakh'],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  const changeHandler = (value) => {
   // console.log(value)
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <motion.div
      className="w-full bg-white p-6 rounded-lg shadow-md transition-all hover:shadow-lg"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="font-bold text-lg text-[#7209b7]">Filter Jobs</h1>
      <hr className="mt-2 mb-4 border-gray-200" />

      <RadioGroup onValueChange={changeHandler} value={selectedValue}>
        {filterData.map((data, index) => (
          <div key={index} className="mb-6">
            <h2 className="font-semibold text-[#F83002] text-md mb-2">
              {data.filterType}
            </h2>
            <div className="grid grid-cols-1 gap-2">
              {/* Add "No Selection" option */}
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value=""
                  id={`no-selection-${data.filterType}`}
                  className="checked:bg-[#7209b7] border-gray-300"
                />
                <Label className="text-gray-600">No Selection</Label>
              </div>
              {data.array.map((item, idx) => {
                const itemId = `filter-${index}-${idx}`;
                return (
                  <div key={itemId} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={item}
                      id={itemId}
                      className="checked:bg-[#7209b7] border-gray-300 focus:ring-2 focus:ring-[#7209b7]"
                    />
                    <Label htmlFor={itemId} className="text-gray-600">
                      {item}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </motion.div>
  );
};

export default FilterCard;
