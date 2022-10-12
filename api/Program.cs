using api.Data;
using api.Models;
using api.Models.Seeds;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.



builder.Services.AddControllers();
builder.Services.AddDbContext<AutoworksDBContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("AutoWorksConnection") ?? throw new InvalidOperationException("Connection string not found")));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = "https://localhost:5000/",
        ValidAudience = "https://localhost:5000/",
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("f3CljfxmYRklUltYHqo2I5tkLmmS26UluOlGdg4w"))
    };
});



builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.WithOrigins("https://toptechautoworks.com").AllowAnyHeader().AllowAnyMethod();
        });
    
    options.AddPolicy("LocalPolicy", 
        policy =>
        {
            policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
        }
    );
});


var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    CustomerTypeDbSeed.Initialize(services);
    CustomerDbSeed.Initialize(services);
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthentication();
app.UseCors("LocalPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();
