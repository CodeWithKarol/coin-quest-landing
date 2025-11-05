# CoinQuest Landing Page - Deployment Guide

## Quick Start

This landing page is a static website that can be deployed to any web hosting platform.

---

## Local Development

### Option 1: Direct File Access

Simply open `index.html` in your browser.

### Option 2: Python Server

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

### Option 3: Node.js HTTP Server

```bash
# Install http-server globally
npm install -g http-server

# Run server
http-server
```

### Option 4: PHP Built-in Server

```bash
php -S localhost:8000
```

---

## Deployment Platforms

### 1. GitHub Pages (Recommended for Git-based hosting)

```bash
# 1. Ensure your repository is public
# 2. Go to Settings > Pages
# 3. Select "Deploy from a branch"
# 4. Choose "main" branch and "/ (root)"
# 5. Click Save

# Your site will be available at:
# https://codewithkarol.github.io/coin-quest-landing/
```

### 2. Netlify (Easiest with automatic builds)

**Option A: Connect from Git**

1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Choose GitHub and select the repository
4. Leave build settings blank (no build needed)
5. Deploy

**Option B: Manual Deployment**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=.
```

Your site will be available at a Netlify subdomain.

### 3. Vercel (Alternative to Netlify)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

Or connect your GitHub repository at [vercel.com](https://vercel.com)

### 4. AWS S3 + CloudFront

```bash
# 1. Create S3 bucket
aws s3 mb s3://coinquest-landing --region us-east-1

# 2. Upload files
aws s3 cp . s3://coinquest-landing --recursive --exclude ".git/*"

# 3. Enable static website hosting
aws s3 website s3://coinquest-landing --index-document index.html --error-document index.html

# 4. Create CloudFront distribution (optional for CDN)
# Use AWS CloudFront console

# Access at: https://your-bucket-name.s3.amazonaws.com/index.html
```

### 5. Traditional Web Host (cPanel, FTP, etc.)

1. Compress all files: `zip -r coinquest-landing.zip .`
2. Upload via FTP or File Manager
3. Extract files on server
4. Ensure `index.html` is in the root directory

### 6. Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:

```bash
docker build -t coinquest-landing .
docker run -p 8080:80 coinquest-landing
```

---

## Pre-Deployment Checklist

- [ ] All links work correctly (use absolute paths or relative paths properly)
- [ ] Test on mobile devices (responsive design verified)
- [ ] Check all external resources load properly
- [ ] Verify form submissions work if implemented
- [ ] Test accessibility (keyboard navigation, screen readers)
- [ ] Performance check (Lighthouse audit)
- [ ] SEO check (meta tags, sitemap, robots.txt if needed)
- [ ] Security check (HTTPS enabled)
- [ ] Browser compatibility test (Chrome, Firefox, Safari, Edge)

---

## Performance Optimization

### Image Optimization

If you add images in the future:

```bash
# Using ImageMagick
convert image.jpg -quality 80 image-optimized.jpg

# Using WebP format
cwebp image.jpg -o image.webp
```

### CSS Minification (optional)

```bash
# Using csso-cli
npm install -g csso-cli
csso styles.css -o styles.min.css
```

### JavaScript Minification (optional)

```bash
# Using terser
npm install -g terser
terser script.js -o script.min.js
```

### Enable Gzip Compression

Most hosting providers enable this automatically. For nginx:

```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
```

---

## SEO Optimization

### Add Sitemap (optional)

Create `sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <priority>1.0</priority>
  </url>
</urlset>
```

### Add Robots.txt (optional)

Create `robots.txt`:

```
User-agent: *
Allow: /
Sitemap: https://yourdomain.com/sitemap.xml
```

### Meta Tags

Already included in `index.html`:

- Title tag
- Meta description
- Viewport meta tag
- Theme color

---

## Security Headers

For better security, add these headers on your server:

### nginx Configuration

```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;" always;
```

### Apache Configuration

```apache
<IfModule mod_headers.c>
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-Content-Type-Options "nosniff"
    Header set X-XSS-Protection "1; mode=block"
</IfModule>
```

---

## SSL/HTTPS Certificate

Most modern hosting providers offer free SSL via Let's Encrypt.

### Certbot for Let's Encrypt

```bash
# Install
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot certonly --nginx -d yourdomain.com

# Auto-renewal (already configured)
sudo systemctl enable certbot.timer
```

---

## Monitoring & Analytics

### Google Analytics (optional)

Add to `index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script
	async
	src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
></script>
<script>
	window.dataLayer = window.dataLayer || [];
	function gtag() {
		dataLayer.push(arguments);
	}
	gtag("js", new Date());
	gtag("config", "G-XXXXXXXXXX");
</script>
```

### Sentry Error Tracking (optional)

```html
<script
	src="https://browser.sentry-cdn.com/7.x.x/bundle.min.js"
	integrity="sha384-..."
	crossorigin="anonymous"
></script>
<script>
	Sentry.init({
		dsn: "YOUR_SENTRY_DSN",
	});
</script>
```

---

## Continuous Deployment

### GitHub Actions (Automatic deployment on push)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

---

## Troubleshooting

### CSS/JS Files Not Loading

- Check file paths are correct
- Ensure capitalization matches (Linux is case-sensitive)
- Check for CORS issues in browser console
- Verify files are uploaded to correct directory

### Fonts Not Loading

- Check Google Fonts link is valid
- Verify internet connection
- Check CORS headers if self-hosting fonts

### Images Not Showing

- Verify image file extensions (.jpg, .png, .webp)
- Check image paths are correct
- Use relative paths for better portability

### 404 Errors

- Ensure `index.html` is in root directory
- Check routing configuration for your host
- Verify file names match exactly

---

## Performance Monitoring

### Lighthouse Audit

```bash
# Using Chrome DevTools
# 1. Open DevTools (F12)
# 2. Go to Lighthouse tab
# 3. Select "Analyze page load"
```

### WebPageTest

Visit [webpagetest.org](https://webpagetest.org) and test your deployed URL.

### Monitor Uptime

Use services like:

- [UptimeRobot](https://uptimerobot.com/)
- [Pingdom](https://www.pingdom.com/)
- [StatusCake](https://www.statuscake.com/)

---

## Maintenance

### Regular Backups

- GitHub handles version control
- Consider additional backups for critical changes
- Keep deployment scripts documented

### Updates

- Monitor for security updates
- Test locally before pushing changes
- Keep Google Fonts and dependencies current

### DNS Configuration

For custom domain:

```
Type    Name    Value
A       @       your-server-ip
CNAME   www     your-server.domain.com
```

---

## Custom Domain Setup

### 1. Purchase Domain

- GoDaddy, Namecheap, Route53, etc.

### 2. Point to Hosting

- Update DNS A records to your hosting IP
- Or update CNAME to your hosting provider's domain

### 3. SSL Certificate

- Most providers auto-issue (Let's Encrypt)
- Ensure HTTPS redirect is enabled

### 4. Verify

```bash
# Check DNS propagation
nslookup yourdomain.com
dig yourdomain.com

# Test SSL
https://yourdomain.com
```

---

## Cost Estimates

| Platform         | Cost            | Best For                     |
| ---------------- | --------------- | ---------------------------- |
| GitHub Pages     | Free            | Git-integrated, simple sites |
| Netlify Free     | Free            | Auto-deployments, easy setup |
| Vercel           | Free tier       | Next.js-ready, fast deploys  |
| AWS S3           | $0.023/GB/month | High traffic, scale          |
| Traditional Host | $5-15/month     | Full control, email support  |
| Docker (VPS)     | $5-20/month     | Containerized apps           |

---

## Support

For deployment issues:

1. Check hosting provider's documentation
2. Review browser console for errors
3. Test locally first
4. Check GitHub Issues
5. Contact support@coinquest.io

---

## Next Steps

After deployment:

1. Test all links and CTAs
2. Monitor analytics
3. Gather user feedback
4. Iterate and improve
5. Promote on social channels

**Play. Save. Win.** 🎮💰🏆
