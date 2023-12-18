//! Reusable function for handling scroll events
const handleScroll = (e, setScrollReachEnd) => {
  if (
    Math.abs(
      e.target.scrollTop + e.target.clientHeight - e.target.scrollHeight
    ) > 10
  ) {
    setScrollReachEnd(false);
  } else {
    setScrollReachEnd(true);
  }
};
