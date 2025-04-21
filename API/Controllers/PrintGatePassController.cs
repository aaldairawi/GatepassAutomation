using API.Dtos;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class PrintGatePassController : BaseAPIController
    {
        private readonly IPrintGatePass _printGatePass;
        public PrintGatePassController(IPrintGatePass printGatePass)
        {
            _printGatePass = printGatePass ?? throw new ArgumentNullException(nameof(printGatePass));
        }

        [HttpPost]
        public async Task<ActionResult<List<PrintGatePassContainerDto>>> Get(PrintGatePassDataDto data)
        {

            var result = await _printGatePass.GetAllContainersToPrint(data);
            if (result is null)
            {
                return BadRequest(new ProblemDetails { Title = "A problem occured when fetching the invoices" });
            }

            return Ok(result.OrderBy((element) => element.ContainerNumber));
        }

        [HttpPost("forcegatepass")]
        public async Task<ActionResult<List<PrintGatePassContainerDto>>> GetContainersByForce(PrintGatePassDataDto data)
        {
            var result = await _printGatePass.GetAllContainersForcefully(data);
            if (result is null)
            {
                return BadRequest(new ProblemDetails { Title = "A problem occured while forecfully printing" });
            }
            return Ok(result.OrderBy((element) => element.ContainerNumber));
        }

    }
}