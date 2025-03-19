import "./customerFeedBack.css"; // Create a CSS file for custom styling
// Sample data for customer feedback (in a real application, we can  replace this with data from an API or props)( remarque 1)
const feedbackData = [
  {
    name: "kenan kraeim",
    feedback: "Astra-Store has been incredibly helpful for my business. The products are top-notch, and the customer service is unparalleled.",
    profilePic: "/img/ayman.webp", // Placeholder image; replace with actual URLs or imported images
  },
  {
    name: "Jane Smith",
    feedback: "The team at Astra-Store is amazing! They went above and beyond to make sure I had everything I needed. Highly recommended!",
    profilePic:"/img/ahlem.jpeg",
  },
  {
    name: "Michael Brown",
    feedback: "I’m very pleased with my experience. The platform is easy to use, and the support team is very responsive.",
    profilePic: "/img/elhem.jpg",
  },
];

function CustomerFeedback() {
  return (
    <div className="customer-feedback-section">
      <h2 className="text-center">Customer Feedback</h2>
      <div className="feedback-cards">
        {feedbackData.map((feedback, index) => (
          <div key={index} className="feedback-card">
            <img src={feedback.profilePic} alt={`${feedback.name}'s profile`} className="profile-pic" />
            <div className="feedback-content">
              <h4 className="customer-name">{feedback.name}</h4>
              <p className="customer-feedback">{feedback.feedback}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerFeedback;
