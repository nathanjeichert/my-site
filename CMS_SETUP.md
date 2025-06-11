# Content Management System Setup

Your site now has a JSON-based content management system with Tina CMS for easy editing!

## 🎯 What's Been Set Up

### 1. Content Structure
All your site content is now stored in JSON files in the `/content` directory:
- `content/music.json` - Track listings and music page content
- `content/shows.json` - Upcoming/past shows and venue information
- `content/about.json` - Band member profiles, philosophy, and timeline
- `content/site.json` - General site settings, navigation, and footer

### 2. Visual Editing Interface
Tina CMS provides a user-friendly editing interface that will be available at `/admin` once configured.

## 🚀 Next Steps to Complete Setup

### 1. Sign up for Tina CMS (Free)
1. Go to [tina.io](https://tina.io) and create a free account
2. Create a new project
3. Connect it to your GitHub repository (`nathanjeichert/my-site`)

### 2. Configure Environment Variables
After creating your Tina project, you'll get:
- Client ID
- Token

Add these to your `.env.local` file (replace the placeholder values):
```
NEXT_PUBLIC_TINA_CLIENT_ID=your_actual_client_id
TINA_TOKEN=your_actual_token
```

### 3. Deploy to Vercel
Once you have the environment variables:
1. Add them to your Vercel project settings
2. Redeploy your site
3. Your CMS will be available at `yourdomain.com/admin`

## 📝 How to Edit Content

### Option 1: Visual Editor (Recommended)
1. Visit `yourdomain.com/admin`
2. Log in with your Tina account
3. Edit content using the visual interface
4. Changes automatically save and deploy

### Option 2: Direct File Editing
You can also edit the JSON files directly in your GitHub repository:
- Go to your repo on GitHub
- Navigate to the `content/` folder
- Edit any `.json` file
- Commit changes
- Vercel will automatically redeploy

## 🎵 Content Types You Can Edit

### Music Page
- Add/remove tracks
- Update track information (title, duration, album, year)
- Modify streaming platform links
- Change page headings

### Shows Page
- Add/remove upcoming shows
- Update venue information
- Modify show descriptions
- Mark shows as sold out
- Edit past shows section

### About Page
- Update band member information
- Modify philosophy statements
- Add timeline events
- Change section headings

### Site Settings
- Update site title and tagline
- Modify navigation menu
- Change footer content
- Update social media links

## 🔄 Workflow

1. **Edit Content** → Visual editor or JSON files
2. **Auto-Save** → Changes commit to GitHub
3. **Auto-Deploy** → Vercel rebuilds and deploys
4. **Live Updates** → Your site updates automatically

## 💡 Benefits

- **No Code Required** - Edit content without touching code
- **Version Control** - All changes tracked in Git
- **Automatic Backups** - Content stored in your repository
- **Fast Updates** - Changes go live in minutes
- **Mobile Friendly** - Edit from any device

## 🆘 Troubleshooting

If you run into issues:
1. Check that environment variables are set correctly
2. Ensure your GitHub repository is connected to Tina
3. Verify your Vercel deployment settings include the environment variables
4. Check the Vercel deployment logs for any errors

## 📚 Next Steps

Want to add more features? You can easily:
- Add new content types (blog posts, press releases, etc.)
- Include image uploads for band photos
- Add SEO meta fields
- Create content preview functionality

All of this can be configured by modifying the `tina/config.ts` file!