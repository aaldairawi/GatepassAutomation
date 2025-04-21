using API.Services;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();


builder.Services.AddCors();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Interfaces and services section.
builder.Services.AddScoped<IDailyInvoicesByCreator, DailyInvoicesByCreatorRepository>();
builder.Services.AddScoped<IPrintGatePass, PrintGatePassRepository>();
builder.Services.AddScoped<IGeneralInvoiceLogic, GeneralInvoiceLogicRepository>();
builder.Services.AddScoped<ISearchFinalizedInvoice, SearchFinalizedInvoiceRepository>();
builder.Services.AddScoped<IDatabase, DatabaseRepository>();

// End of services section.

var app = builder.Build();
app.UseDefaultFiles();
app.UseStaticFiles();
app.MapFallbackToFile("index.html");
app.UseCors(opt => { opt.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin(); });


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
