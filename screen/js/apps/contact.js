export const contactConfig = {
    title: 'Contact',
    width: 460,
    height: 580,
    content: () => `
        <div class="contact">
            <h3 class="contact__title">Get In Touch</h3>
            <p class="contact__subtitle">Feel free to reach out!</p>
            <form class="contact__form" action="mailto:weesean52@gmail.com" method="post" enctype="text/plain">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" name="Name" placeholder="Your Name" required>
                </div>
                <div class="form-group">
                    <label for="subject">Subject</label>
                    <input type="text" id="subject" name="Subject" placeholder="What is this regarding?" required>
                </div>
                <div class="form-group">
                    <label for="body">Message</label>
                    <textarea id="body" name="Message" rows="5" placeholder="Your message here..." required></textarea>
                </div>
                <button type="submit" class="contact__submit-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                    Send Email
                </button>
            </form>
        </div>
    `,
};
