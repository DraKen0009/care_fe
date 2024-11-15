const Success = vi.fn(({ msg }) =>
  console.log(`Mock Success Notification: ${msg}`),
);
const Error = vi.fn(({ msg }) =>
  console.log(`Mock Error Notification: ${msg}`),
);
const Warn = vi.fn(({ msg }) => console.log(`Mock Warn Notification: ${msg}`));
const BadRequest = vi.fn(({ errs }) =>
  console.log(`Mock Bad Request: ${errs}`),
);
const closeAllNotifications = vi.fn(() =>
  console.log("Mock Close All Notifications"),
);

export { Success, Error, Warn, BadRequest, closeAllNotifications };
