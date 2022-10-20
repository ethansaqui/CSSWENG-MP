using api.Data;
using api.Models;
using api.Views;
using Microsoft.AspNetCore.Mvc;


namespace api.Controllers
{
    // Implementation of the controller for invoices. It allows for CRUD ops on the Invoices Table
    [ApiController]
    [Route("api/[Controller]")]
    public class InvoiceController : GenericItemController<Invoice, InvoiceDetailView>
    {
        public InvoiceController(AutoworksDBContext ctx) : base(new InvoiceRepository(ctx))
        {

        }
        
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async override Task<IEnumerable<InvoiceDetailView>> GetAll()
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            List<InvoiceDetailView> view = new List<InvoiceDetailView>();

            foreach (Invoice invoice in repository.GetAll())
            {
                view.Add(new InvoiceDetailView(invoice));
            }

            return view;
        }

        public async override Task<InvoiceDetailView?> Get(int id)
        {
            Invoice? i = await GetRaw(id);
            if (i == null)
                return null;

            return new InvoiceDetailView(i);
        }


        public async override Task<IEnumerable<InvoiceDetailView>> GetByPredicate(Predicate<Invoice> predicate)
        {
            IEnumerable<InvoiceDetailView> filtered = await GetAll();

            return filtered;
        }
    }
}
