const steps = [
    {
      selector: '[data-tour="step-1"]',
      content: "Welcome! This system will guide you through a 3-phase vital signs collection process. Please follow the steps carefully."
    },
    {
      selector: '[data-tour="step-2"]',
      content: "In Phase 1, the system will automatically capture the first 3 vital signs within 5 seconds. Just stay still and relaxed during this time."
    },
    {
      selector: '[data-tour="step-3"]',
      content: "In Phase 2, the next 3 vital signs will also be recorded automatically over 5 seconds. No manual input is required yet."
    },
    {
      selector: '[data-tour="step-4"]',
      content: "In Phase 3, you will be asked to manually enter the remaining vital signs."
    },
    {
      selector: '[data-tour="step-5"]',
      content: "After filling them out, click Predict to submit all data to the machine learning model."
    }
];
  
export default steps;