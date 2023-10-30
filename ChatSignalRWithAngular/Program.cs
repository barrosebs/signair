using Chat;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddSignalR();
builder.Services.AddCors(options => options.AddPolicy("PermitirOrigemLocalHost", policy => policy.WithOrigins("https://localhost:44440", "wss://localhost:44440")
                                            .AllowAnyHeader()
                                            .AllowAnyMethod()
                                            .AllowCredentials()));
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors("PermitirOrigemLocalHost");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");
app.UseRouting();
app.MapFallbackToFile("index.html");
app.MapHub<ChatPrivate>("/chatprivate");
app.Run();
