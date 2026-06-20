import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: (process.env.GMAIL_USER ?? "").trim(),
    pass: (process.env.GMAIL_PASS ?? "").trim(),
  },
});

// ── Types ─────────────────────────────────────────────────────────────────────

interface AdminEmailData {
  name: string;
  email?: string;
  phone?: string;
  guests: string;
  attendance: "yes" | "no";
  meal?: string;
  message?: string;
}

interface GuestEmailData {
  name: string;
  email: string;
  attendance: "yes" | "no";
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmt(date: Date): string {
  return date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "long",
    timeStyle: "short",
  });
}

// ── Admin Notification Template ───────────────────────────────────────────────

function adminEmailHtml(data: AdminEmailData): string {
  const { name, email, phone, guests, attendance, meal, message } = data;
  const statusColor = attendance === "yes" ? "#2E7D32" : "#C62828";
  const statusLabel = attendance === "yes" ? "✅ Joyfully Accepting" : "❌ Regretfully Declining";
  const mealLabel = meal === "veg" ? "🥗 Pure Vegetarian" : meal === "nonveg" ? "🍖 Non-Vegetarian" : "—";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>New RSVP – Deepak & Chandani Wedding</title>
</head>
<body style="margin:0;padding:0;background:#F5E6D3;font-family:Georgia,'Times New Roman',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5E6D3;padding:30px 10px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- HEADER -->
        <tr>
          <td style="background:linear-gradient(135deg,#5C0A12 0%,#3C050B 100%);border-radius:16px 16px 0 0;padding:36px 40px 28px;text-align:center;">
            <div style="border:1px solid rgba(212,175,55,0.45);border-radius:12px;padding:24px 20px;">
              <p style="color:#D4AF37;font-size:13px;letter-spacing:4px;margin:0 0 12px;font-family:Georgia,serif;">॥ श्री गणेशाय नमः ॥</p>
              <div style="height:1px;background:linear-gradient(to right,transparent,#D4AF37,transparent);margin:0 auto 16px;width:75%;"></div>
              <h1 style="color:#FAF7F2;font-family:Georgia,serif;font-size:28px;font-weight:700;margin:0;letter-spacing:3px;">Deepak ❤️ Chandani</h1>
              <p style="color:rgba(212,175,55,0.8);font-size:11px;letter-spacing:5px;text-transform:uppercase;margin:10px 0 0;">Wedding Invitation</p>
            </div>
            <p style="color:rgba(250,247,242,0.7);font-size:11px;letter-spacing:2px;margin:16px 0 0;">RSVP ADMIN NOTIFICATION</p>
          </td>
        </tr>

        <!-- ALERT BANNER -->
        <tr>
          <td style="background:#FFF8F0;padding:20px 40px;border-left:1px solid rgba(212,175,55,0.25);border-right:1px solid rgba(212,175,55,0.25);text-align:center;">
            <span style="display:inline-block;background:rgba(212,175,55,0.15);border:1px solid rgba(212,175,55,0.4);border-radius:30px;padding:8px 24px;color:#8B6914;font-size:12px;letter-spacing:2px;text-transform:uppercase;">🎉 New RSVP Received</span>
          </td>
        </tr>

        <!-- GUEST DETAILS TABLE -->
        <tr>
          <td style="background:#FFFFFF;padding:32px 40px;border-left:1px solid rgba(212,175,55,0.25);border-right:1px solid rgba(212,175,55,0.25);">
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid rgba(212,175,55,0.3);border-radius:12px;overflow:hidden;">
              <tr><td colspan="2" style="background:linear-gradient(to right,#FDF5E6,#FAF0D7);padding:14px 20px;">
                <p style="color:#8B6914;font-size:10px;letter-spacing:4px;text-transform:uppercase;margin:0;">Guest Details</p>
              </td></tr>

              ${[
                ["👤 Guest Name", name],
                ["📱 Mobile Number", phone || "—"],
                ["📧 Email Address", email || "—"],
                ["👥 Number of Guests", guests],
                ["🍽️ Meal Preference", mealLabel],
                ["📅 Submitted At", fmt(new Date())],
              ]
                .map(
                  ([label, value], i) => `
              <tr style="background:${i % 2 === 0 ? "#FFFFFF" : "#FDFAF5"};">
                <td style="padding:13px 20px;border-bottom:1px solid rgba(212,175,55,0.12);width:44%;">
                  <span style="color:#8B6914;font-size:11px;font-family:Arial,sans-serif;">${label}</span>
                </td>
                <td style="padding:13px 20px;border-bottom:1px solid rgba(212,175,55,0.12);">
                  <strong style="color:#2D1810;font-size:13px;font-family:Arial,sans-serif;">${value}</strong>
                </td>
              </tr>`
                )
                .join("")}

              <!-- Attendance row – coloured -->
              <tr style="background:#FDF5E6;">
                <td style="padding:13px 20px;border-bottom:1px solid rgba(212,175,55,0.12);">
                  <span style="color:#8B6914;font-size:11px;font-family:Arial,sans-serif;">✨ Attending?</span>
                </td>
                <td style="padding:13px 20px;border-bottom:1px solid rgba(212,175,55,0.12);">
                  <span style="color:${statusColor};font-weight:700;font-size:13px;font-family:Arial,sans-serif;">${statusLabel}</span>
                </td>
              </tr>

              <!-- Message row -->
              <tr>
                <td style="padding:13px 20px;" valign="top">
                  <span style="color:#8B6914;font-size:11px;font-family:Arial,sans-serif;">💬 Message</span>
                </td>
                <td style="padding:13px 20px;">
                  <span style="color:#2D1810;font-size:13px;font-style:italic;font-family:Arial,sans-serif;">${message || "—"}</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="background:linear-gradient(135deg,#3C050B,#1F0104);border-radius:0 0 16px 16px;padding:24px 40px;text-align:center;">
            <div style="height:1px;background:linear-gradient(to right,transparent,rgba(212,175,55,0.4),transparent);margin:0 0 18px;"></div>
            <p style="color:rgba(212,175,55,0.85);font-size:16px;margin:0 0 4px;letter-spacing:2px;">Deepak ❤️ Chandani</p>
            <p style="color:rgba(250,247,242,0.45);font-size:10px;letter-spacing:3px;text-transform:uppercase;margin:0 0 4px;">Wedding Celebration</p>
            <p style="color:rgba(250,247,242,0.35);font-size:10px;margin:0;">10 February 2027 • Palamu, Jharkhand</p>
            <p style="color:rgba(212,175,55,0.35);font-size:9px;margin:10px 0 0;">With Love ❤️</p>
            <div style="height:1px;background:linear-gradient(to right,transparent,rgba(212,175,55,0.35),transparent);margin:14px auto 12px;width:70%;"></div>
            <p style="color:rgba(246,238,223,0.55);font-size:11px;margin:0;font-family:Arial,sans-serif;letter-spacing:1px;">
              Designed &amp; Developed by&nbsp;
              <a href="https://deepak-portfolio-lilac.vercel.app/" target="_blank" rel="noopener noreferrer"
                 style="color:#D4AF37;font-weight:600;text-decoration:underline;text-decoration-color:rgba(212,175,55,0.4);font-family:Arial,sans-serif;">Deepak Kumar</a>
              &nbsp;<span style="color:rgba(212,175,55,0.5);">·</span>&nbsp;
              <a href="tel:9801558387"
                 style="color:rgba(246,238,223,0.7);text-decoration:none;font-family:Arial,sans-serif;">9801558387</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ── Guest Confirmation Template ────────────────────────────────────────────────

function guestEmailHtml(data: GuestEmailData): string {
  const { name, attendance } = data;

  const isAttending = attendance === "yes";

  const conditionalBlock = isAttending
    ? `<div style="background:linear-gradient(135deg,#FDF5E6,#FAF0D7);border:1px solid rgba(212,175,55,0.35);border-radius:12px;padding:20px 24px;margin:24px 0;text-align:center;">
        <p style="color:#701019;font-size:14px;line-height:1.8;margin:0;font-family:Georgia,serif;font-style:italic;">
          "We look forward to celebrating with you. Your presence will make our wedding day truly unforgettable."
        </p>
      </div>`
    : `<div style="background:#FDF5F5;border:1px solid rgba(198,40,40,0.15);border-radius:12px;padding:20px 24px;margin:24px 0;text-align:center;">
        <p style="color:#701019;font-size:14px;line-height:1.8;margin:0;font-family:Georgia,serif;font-style:italic;">
          "Thank you for your warm wishes and blessings. Though you cannot join us in person, you will always be in our hearts."
        </p>
      </div>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>RSVP Confirmation – Deepak & Chandani Wedding</title>
</head>
<body style="margin:0;padding:0;background:#FDF5E6;font-family:Georgia,'Times New Roman',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FDF5E6;padding:30px 10px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- HEADER -->
        <tr>
          <td style="background:linear-gradient(135deg,#701019 0%,#3C050B 100%);border-radius:16px 16px 0 0;padding:40px 40px 32px;text-align:center;">
            <div style="border:1px solid rgba(212,175,55,0.45);border-radius:12px;padding:28px 24px;">

              <!-- Ganesha Blessing -->
              <p style="color:#D4AF37;font-size:14px;letter-spacing:4px;margin:0 0 14px;font-family:Georgia,serif;">॥ श्री गणेशाय नमः ॥</p>

              <!-- Gold divider -->
              <div style="height:1px;background:linear-gradient(to right,transparent,#D4AF37,transparent);margin:0 auto 18px;width:70%;"></div>

              <!-- Names -->
              <h1 style="color:#FAF7F2;font-family:Georgia,serif;font-size:34px;font-weight:700;margin:0 0 6px;letter-spacing:3px;">Deepak ❤️ Chandani</h1>
              <p style="color:rgba(212,175,55,0.85);font-size:11px;letter-spacing:6px;text-transform:uppercase;margin:0;">WEDDING INVITATION</p>
            </div>
          </td>
        </tr>

        <!-- HINDI TAGLINE BAND -->
        <tr>
          <td style="background:linear-gradient(to right,#8B0000,#701019);padding:14px 40px;text-align:center;">
            <p style="color:rgba(250,247,242,0.85);font-size:13px;letter-spacing:2px;margin:0 0 4px;font-family:Georgia,serif;">आपकी उपस्थिति हमारे लिए अमूल्य है</p>
            <p style="color:rgba(212,175,55,0.75);font-size:10px;letter-spacing:3px;text-transform:uppercase;margin:0;">Your Presence Means The World To Us</p>
          </td>
        </tr>

        <!-- BODY -->
        <tr>
          <td style="background:#FFFFFF;padding:40px;border-left:1px solid rgba(212,175,55,0.2);border-right:1px solid rgba(212,175,55,0.2);">

            <!-- Gold ornament divider -->
            <div style="text-align:center;margin:0 0 28px;">
              <span style="color:#D4AF37;font-size:20px;">✦</span>
            </div>

            <!-- Greeting -->
            <p style="color:#2D1810;font-size:16px;line-height:1.8;margin:0 0 18px;">
              Dear <strong style="color:#701019;">${name}</strong>,
            </p>

            <p style="color:#3D2010;font-size:14px;line-height:1.9;margin:0 0 14px;">
              Thank you for confirming your presence for our wedding celebration.
            </p>

            <p style="color:#3D2010;font-size:14px;line-height:1.9;margin:0 0 14px;">
              We are delighted to have you join us on our special day. Your blessings and presence will make our celebration even more memorable.
            </p>

            <!-- Conditional attending/not attending block -->
            ${conditionalBlock}

            <!-- Gold divider -->
            <div style="height:1px;background:linear-gradient(to right,transparent,#D4AF37,transparent);margin:30px 0;"></div>

            <!-- Wedding Details Box -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#FDF5E6,#FAF0D7);border:1px solid rgba(212,175,55,0.4);border-radius:12px;overflow:hidden;margin:0 0 28px;">
              <tr>
                <td style="padding:22px 28px;">
                  <p style="color:#D4AF37;font-size:10px;letter-spacing:5px;text-transform:uppercase;margin:0 0 18px;text-align:center;font-family:Arial,sans-serif;">WEDDING DETAILS</p>

                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding:10px 0;border-bottom:1px solid rgba(212,175,55,0.18);">
                        <span style="color:#8B6914;font-size:11px;font-family:Arial,sans-serif;">📅 DATE</span>
                        <span style="color:#2D1810;font-size:13px;font-weight:700;float:right;font-family:Arial,sans-serif;">Wednesday, 10 February 2027</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:10px 0;border-bottom:1px solid rgba(212,175,55,0.18);">
                        <span style="color:#8B6914;font-size:11px;font-family:Arial,sans-serif;">🕖 TIME</span>
                        <span style="color:#2D1810;font-size:13px;font-weight:700;float:right;font-family:Arial,sans-serif;">7:00 PM Onwards</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:10px 0;border-bottom:1px solid rgba(212,175,55,0.18);">
                        <span style="color:#8B6914;font-size:11px;font-family:Arial,sans-serif;">📍 VENUE</span>
                        <span style="color:#2D1810;font-size:13px;font-weight:700;float:right;font-family:Arial,sans-serif;">Palamu, Jharkhand</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:10px 0;">
                        <span style="color:#8B6914;font-size:11px;font-family:Arial,sans-serif;">🗺️ DRESS CODE</span>
                        <span style="color:#701019;font-size:13px;font-weight:700;float:right;font-family:Arial,sans-serif;">Traditional / Ethnic Wear</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Signature -->
            <div style="text-align:center;margin:0;">
              <p style="color:#5C0A12;font-size:14px;font-style:italic;margin:0 0 8px;">With Love & Blessings,</p>
              <p style="color:#701019;font-family:Georgia,serif;font-size:24px;font-weight:700;margin:0;letter-spacing:2px;">Deepak ❤️ Chandani</p>
              <p style="color:#8B6914;font-size:11px;letter-spacing:3px;margin:8px 0 0;font-family:Arial,sans-serif;">FEBRUARY 10, 2027</p>
            </div>

          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="background:linear-gradient(135deg,#3C050B,#1F0104);border-radius:0 0 16px 16px;padding:28px 40px;text-align:center;">
            <div style="height:1px;background:linear-gradient(to right,transparent,rgba(212,175,55,0.5),transparent);margin:0 0 20px;"></div>
            <p style="color:rgba(212,175,55,0.9);font-size:18px;margin:0 0 6px;font-family:Georgia,serif;letter-spacing:2px;">Deepak ❤️ Chandani</p>
            <p style="color:rgba(250,247,242,0.5);font-size:10px;letter-spacing:3px;text-transform:uppercase;margin:0 0 4px;font-family:Arial,sans-serif;">Wedding Celebration</p>
            <p style="color:rgba(250,247,242,0.35);font-size:10px;margin:0;font-family:Arial,sans-serif;">10 February 2027 • Palamu, Jharkhand</p>
            <div style="height:1px;background:linear-gradient(to right,transparent,rgba(212,175,55,0.25),transparent);margin:16px 0 12px;"></div>
            <p style="color:rgba(212,175,55,0.4);font-size:9px;margin:0 0 10px;font-family:Arial,sans-serif;">With Love ❤️</p>
            <div style="height:1px;background:linear-gradient(to right,transparent,rgba(212,175,55,0.14),transparent);margin:0 auto 10px;width:60%;"></div>
            <p style="color:rgba(246,238,223,0.2);font-size:9px;margin:0;font-family:Arial,sans-serif;letter-spacing:1.5px;text-transform:uppercase;">
              Designed &amp; Developed by
              <a href="https://deepak-portfolio-lilac.vercel.app/" target="_blank" rel="noopener noreferrer"
                 style="color:rgba(212,175,55,0.48);text-decoration:underline;text-decoration-color:rgba(212,175,55,0.25);font-family:Arial,sans-serif;">Deepak Kumar</a>
              &nbsp;·&nbsp;
              <a href="tel:9801558387"
                 style="color:rgba(212,175,55,0.48);text-decoration:none;font-family:Arial,sans-serif;">9801558387</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ── Public send functions ─────────────────────────────────────────────────────

export async function sendAdminNotification(data: AdminEmailData): Promise<void> {
  const adminEmail = (process.env.ADMIN_EMAIL ?? "").trim();
  if (!adminEmail) return;

  await transporter.sendMail({
    from: `"Deepak & Chandani Wedding" <${(process.env.GMAIL_USER ?? "").trim()}>`,
    to: adminEmail,
    subject: "🎉 New Wedding RSVP Received",
    html: adminEmailHtml(data),
  });
}

export async function sendGuestConfirmation(data: GuestEmailData): Promise<void> {
  await transporter.sendMail({
    from: `"Deepak & Chandani Wedding 💍" <${(process.env.GMAIL_USER ?? "").trim()}>`,
    to: data.email,
    subject: "💍 Thank You For Your RSVP – Deepak ❤️ Chandani Wedding",
    html: guestEmailHtml(data),
  });
}
