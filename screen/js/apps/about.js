export const aboutConfig = {
    title: 'About Me',
    width: 640,
    height: 480,
    content: () => `
        <div class="about">
            <img src="assets/profile.jpg" class="about__avatar" style="object-fit: cover;" alt="Sean Wee">
            <div class="about__info">
                <h2 class="about__name">Sean Wee</h2>
                <div class="about__title">Full-time Student</div>
                <p class="about__bio">
                    Hi there! I'm a Year 2 student at Nanyang Technological University (NTU), Singapore. 
                    I'm passionate about building full-stack web applications and exploring the intersection 
                    of 3D graphics and web development. Outside of tech, I love 3D modelling and running.
                </p>
                <div class="about__stats">
                    <div class="about__stat">
                        <span class="about__stat-icon">📍</span>
                        <span>Singapore</span>
                    </div>
                    <div class="about__stat">
                        <span class="about__stat-icon">🎓</span>
                        <span>Y2 @ NTU</span>
                    </div>
                    <div class="about__stat">
                        <span class="about__stat-icon">💻</span>
                        <span>Full Stack Developer</span>
                    </div>
                    <div class="about__stat">
                        <span class="about__stat-icon">🏃</span>
                        <span>Running</span>
                    </div>
                    <div class="about__stat">
                        <span class="about__stat-icon">🎨</span>
                        <span>3D Modelling</span>
                    </div>
                </div>
            </div>
        </div>
    `,
};
