<template>
  <footer class="app-footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">
          <div class="logo-icon">
            <i class="fas fa-pills"></i>
          </div>
          <h3>{{ $t('app.name') }}</h3>
          <p>{{ $t('app.description') }}</p>
        </div>
        
        <div class="footer-links">
          <div class="link-group">
            <h4>Navigation</h4>
            <router-link to="/" class="footer-link">Home</router-link>
            <router-link to="/medicaments" class="footer-link">Medicaments</router-link>
            <router-link to="/notes" class="footer-link">Notes</router-link>
            <router-link to="/articles" class="footer-link">Articles</router-link>
            <router-link to="/references" class="footer-link">References</router-link>
          </div>
          
          <div class="link-group">
            <h4>Resources</h4>
            <a href="#" class="footer-link">Documentation</a>
            <a href="#" class="footer-link">API</a>
            <a href="#" class="footer-link">GitHub</a>
            <a href="#" class="footer-link">Support</a>
          </div>
          
          <div class="link-group">
            <h4>Legal</h4>
            <a href="#" class="footer-link">Privacy Policy</a>
            <a href="#" class="footer-link">Terms of Service</a>
            <a href="#" class="footer-link">Disclaimer</a>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2023 PharmNotes. All rights reserved.</p>
        <p class="disclaimer">
          This application is for educational purposes only. Always consult a healthcare professional for medical advice.
        </p>
        
        <div class="social-links">
          <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
          <a href="#" class="social-link"><i class="fab fa-github"></i></a>
          <a href="#" class="social-link"><i class="fab fa-linkedin"></i></a>
          <a href="#" class="social-link"><i class="fas fa-envelope"></i></a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped>
.app-footer {
  background-color: var(--card-bg);
  padding: 50px 0 30px;
  border-top: 2px dashed var(--border);
  margin-top: 60px;
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 50px;
  margin-bottom: 40px;
}

.footer-logo {
  max-width: 300px;
}

.footer-logo .logo-icon {
  background-color: var(--accent);
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.footer-logo h3 {
  color: var(--primary);
  margin-bottom: 10px;
  font-size: 24px;
}

.footer-logo p {
  color: var(--text-light);
  line-height: 1.6;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

.link-group h4 {
  color: var(--primary);
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 600;
}

.footer-link {
  display: block;
  color: var(--text-light);
  text-decoration: none;
  margin-bottom: 12px;
  transition: var(--transition);
}

.footer-link:hover {
  color: var(--accent);
  transform: translateX(5px);
}

.footer-bottom {
  text-align: center;
  padding-top: 30px;
  border-top: 1px solid var(--border);
}

.footer-bottom p {
  color: var(--text-light);
  margin-bottom: 10px;
}

.disclaimer {
  font-size: 14px;
  max-width: 600px;
  margin: 0 auto 20px;
  line-height: 1.6;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: var(--background);
  color: var(--text);
  border-radius: 50%;
  text-decoration: none;
  font-size: 18px;
  transition: var(--transition);
}

.social-link:hover {
  background-color: var(--accent);
  color: white;
  transform: translateY(-3px);
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .footer-links {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }
}

@media (max-width: 480px) {
  .footer-links {
    grid-template-columns: 1fr;
  }
}
</style>