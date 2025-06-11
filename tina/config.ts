import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "public",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "music",
        label: "Music",
        path: "content",
        match: {
          include: "music",
        },
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "object",
            name: "pageContent",
            label: "Page Content",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Page Title",
              },
              {
                type: "string",
                name: "streamingText",
                label: "Streaming Section Text",
              },
              {
                type: "object",
                name: "streamingLinks",
                label: "Streaming Links",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "name",
                    label: "Platform Name",
                  },
                  {
                    type: "string",
                    name: "url",
                    label: "URL",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "tracks",
            label: "Tracks",
            list: true,
            fields: [
              {
                type: "number",
                name: "id",
                label: "ID",
              },
              {
                type: "string",
                name: "title",
                label: "Track Title",
              },
              {
                type: "string",
                name: "duration",
                label: "Duration",
              },
              {
                type: "string",
                name: "src",
                label: "Audio File Path",
              },
              {
                type: "string",
                name: "album",
                label: "Album",
              },
              {
                type: "string",
                name: "year",
                label: "Year",
              },
            ],
          },
        ],
      },
      {
        name: "shows",
        label: "Shows",
        path: "content",
        match: {
          include: "shows",
        },
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "object",
            name: "pageContent",
            label: "Page Content",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Page Title",
              },
              {
                type: "string",
                name: "pastShowsTitle",
                label: "Past Shows Section Title",
              },
            ],
          },
          {
            type: "object",
            name: "upcomingShows",
            label: "Upcoming Shows",
            list: true,
            fields: [
              {
                type: "string",
                name: "date",
                label: "Date",
              },
              {
                type: "string",
                name: "time",
                label: "Time",
              },
              {
                type: "string",
                name: "venue",
                label: "Venue",
              },
              {
                type: "string",
                name: "location",
                label: "Location",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "ticketLink",
                label: "Ticket Link",
              },
              {
                type: "boolean",
                name: "soldOut",
                label: "Sold Out",
              },
            ],
          },
          {
            type: "object",
            name: "pastShows",
            label: "Past Shows",
            list: true,
            fields: [
              {
                type: "string",
                name: "title",
                label: "Show Title",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: {
                  component: "textarea",
                },
              },
            ],
          },
        ],
      },
      {
        name: "about",
        label: "About",
        path: "content",
        match: {
          include: "about",
        },
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "object",
            name: "pageContent",
            label: "Page Content",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Page Title",
              },
              {
                type: "string",
                name: "philosophyTitle",
                label: "Philosophy Section Title",
              },
              {
                type: "string",
                name: "journeyTitle",
                label: "Journey Section Title",
              },
            ],
          },
          {
            type: "object",
            name: "bandMembers",
            label: "Band Members",
            list: true,
            fields: [
              {
                type: "string",
                name: "name",
                label: "Name",
              },
              {
                type: "string",
                name: "role",
                label: "Role/Instruments",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "color",
                label: "Theme Color",
                options: ["rust", "sage", "gold", "burgundy"],
              },
            ],
          },
          {
            type: "object",
            name: "philosophy",
            label: "Philosophy",
            list: true,
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: {
                  component: "textarea",
                },
              },
            ],
          },
          {
            type: "object",
            name: "timeline",
            label: "Timeline",
            list: true,
            fields: [
              {
                type: "string",
                name: "year",
                label: "Year",
              },
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: {
                  component: "textarea",
                },
              },
            ],
          },
        ],
      },
      {
        name: "site",
        label: "Site Settings",
        path: "content",
        match: {
          include: "site",
        },
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "object",
            name: "general",
            label: "General Settings",
            fields: [
              {
                type: "string",
                name: "siteTitle",
                label: "Site Title",
              },
              {
                type: "string",
                name: "tagline",
                label: "Tagline",
              },
              {
                type: "string",
                name: "description",
                label: "Site Description",
                ui: {
                  component: "textarea",
                },
              },
            ],
          },
          {
            type: "object",
            name: "navigation",
            label: "Navigation",
            fields: [
              {
                type: "object",
                name: "items",
                label: "Navigation Items",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "name",
                    label: "Name",
                  },
                  {
                    type: "string",
                    name: "href",
                    label: "URL",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "footer",
            label: "Footer",
            fields: [
              {
                type: "string",
                name: "copyright",
                label: "Copyright Text",
              },
              {
                type: "object",
                name: "socialLinks",
                label: "Social Links",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "name",
                    label: "Platform Name",
                  },
                  {
                    type: "string",
                    name: "url",
                    label: "URL",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});