import { Github, Instagram, Mail, MapPin, Phone, Send, Twitter } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import PageHeader from "../Components/Ui/PageHeader";
import axiosInstance from "../Helpers/axiosInstace";
import { isEmail } from "../Helpers/regexMatcher";
import HomeLayout from "../Layouts/HomeLayout";

function Contact() {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setUserInput((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function validate() {
    const errors = {};
    if (!userInput.name.trim()) errors.name = "Please enter your name";
    if (!userInput.email.trim()) {
      errors.email = "Please enter your email";
    } else if (!isEmail(userInput.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!userInput.message.trim()) errors.message = "Please enter a message";
    return errors;
  }

  async function onFormSubmit(event) {
    event.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      toast.error("Please fix the highlighted fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = axiosInstance.post("/contact", userInput);

      toast.promise(response, {
        loading: "Submitting your message...",
        success: "Message submitted successfully — we'll be in touch",
        error: "Failed to submit the form. Please try again",
      });

      const contactResponse = await response;
      if (contactResponse?.data?.success) {
        setUserInput({ name: "", email: "", message: "" });
      }
    } catch {
      toast.error("Something went wrong while sending your message");
    } finally {
      setIsSubmitting(false);
    }
  }

  const contactInfo = [
    { icon: Mail, label: "Email us", value: "subha9.5roy350@gmail.com" },
    { icon: Phone, label: "Call us", value: "XXXXX XXXXX" },
    { icon: MapPin, label: "Location", value: "Techno Main Salt Lake, Kolkata" },
  ];

  const socials = [
    { name: "Twitter", icon: Twitter },
    { name: "Instagram", icon: Instagram },
    { name: "GitHub", icon: Github },
  ];

  return (
    <HomeLayout>
      <div className="container-page py-16">
        <PageHeader
          center
          eyebrow="Contact"
          title="Let's get in touch"
          description="Fill out the form below and we'll get back to you as soon as possible."
        />

        <div className="card anim-fade-up grid gap-12 p-6 sm:p-10 lg:grid-cols-2">
          {/* Form */}
          <form onSubmit={onFormSubmit} noValidate className="space-y-5">
            <div>
              <label htmlFor="name" className="label">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={userInput.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                aria-invalid={Boolean(fieldErrors.name)}
                className={`input ${fieldErrors.name ? "input-error" : ""}`}
              />
              {fieldErrors.name && (
                <p className="field-error" role="alert">
                  {fieldErrors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="label">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={userInput.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                aria-invalid={Boolean(fieldErrors.email)}
                className={`input ${fieldErrors.email ? "input-error" : ""}`}
              />
              {fieldErrors.email && (
                <p className="field-error" role="alert">
                  {fieldErrors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="label">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={userInput.message}
                onChange={handleInputChange}
                placeholder="How can we help?"
                aria-invalid={Boolean(fieldErrors.message)}
                className={`input resize-none ${fieldErrors.message ? "input-error" : ""}`}
              />
              {fieldErrors.message && (
                <p className="field-error" role="alert">
                  {fieldErrors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full"
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span
                    className="inline-block size-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                    aria-hidden="true"
                  />
                  Sending...
                </>
              ) : (
                <>
                  Send message
                  <Send className="size-4" aria-hidden="true" />
                </>
              )}
            </button>
          </form>

          {/* Contact info */}
          <div className="flex flex-col gap-6">
            <h3 className="text-lg font-semibold">Connect with us</h3>

            {contactInfo.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400">
                  <Icon className="size-4.5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-200">{label}</p>
                  <p className="text-sm text-slate-400">{value}</p>
                </div>
              </div>
            ))}

            <div className="mt-auto flex gap-3 pt-6">
              {socials.map(({ name, icon: Icon }) => (
                <a
                  key={name}
                  href="#"
                  aria-label={name}
                  className="flex size-10 items-center justify-center rounded-lg border border-slate-800 text-slate-400 transition-colors duration-200 hover:border-rose-500/40 hover:bg-rose-500/10 hover:text-rose-400"
                >
                  <Icon className="size-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default Contact;
