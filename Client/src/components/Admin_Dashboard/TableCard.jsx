import React from "react";

const TableCard = ({ title, count, columns, data }) => {
  return (
    <div className="bg-teal-50 shadow rounded-xl p-4 flex-1">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-semibold text-gray-800">{title}</h3>
        <span className="bg-red-700 text-white text-xs px-2 py-1 rounded-full">
          {count}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-700">
          <thead>
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className="text-left py-2 px-2 font-medium text-gray-600"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="border-t border-t-gray-200">
                {row.map((cell, i) => (
                  <td key={i} className="py-2 px-2">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableCard;
