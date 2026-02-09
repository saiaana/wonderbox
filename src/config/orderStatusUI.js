export const orderStatusUIConfig = {
  created: {
    label: "Created",
    className: "bg-blue-100 text-blue-800",
  },
  pending: {
    label: "Pending",
    className: "bg-yellow-100 text-yellow-800",
  },
  paid: {
    label: "Paid",
    className: "bg-green-100 text-green-800",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-100 text-red-800",
  },
  "in progress": {
    label: "In Progress",
    className: "bg-purple-100 text-purple-800",
  },
  "out for delivery": {
    label: "Out for Delivery",
    className: "bg-indigo-100 text-indigo-800",
  },
  delivered: {
    label: "Delivered",
    className: "bg-emerald-100 text-emerald-800",
  },
};

export const defaultStatusUI = {
  label: "Unknown",
  className: "bg-stone-100 text-stone-800",
};


export function getStatusUI(status) {
  return orderStatusUIConfig[status] || defaultStatusUI;
}